import json,datetime
from pull import get
from concurrent.futures import ThreadPoolExecutor
DEEP=[(42,77796,"Regionalliga Nord 25/26","Germany"),(1083,77748,"Regionalliga Nordost 25/26","Germany"),(493,77987,"Regionalliga West 25/26","Germany"),
      (1079,78007,"Regionalliga Südwest 25/26","Germany"),(1085,77988,"Regionalliga Bayern 25/26","Germany"),(10326,92447,"Brasileirão Série D 2026","Brazil")]
rows=[]
for tid,sid,label,c in DEEP:
    d=get(f"unique-tournament/{tid}/season/{sid}/statistics?limit=40&offset=0&order=-goals&accumulation=total&fields=goals,assists,appearances")
    for r in d.get("results",[]): rows.append(dict(pid=r["player"]["id"],name=r["player"]["name"],team=r["team"]["name"],league=label,country=c,g=r.get("goals"),a=r.get("assists")))
def f(r): return r,get(f"player/{r['pid']}").get("player",{})
NOW=datetime.datetime(2026,10,11); out=[]
with ThreadPoolExecutor(10) as ex:
    for r,p in ex.map(f,rows):
        dob=p.get("dateOfBirth"); age=round((NOW-datetime.datetime.fromisoformat(dob[:10])).days/365.25,1) if dob else None
        ct=p.get("contractUntilTimestamp"); ct=datetime.datetime.fromtimestamp(ct,datetime.UTC).strftime("%Y-%m") if ct else None
        out.append(r|dict(age=age,pos="/".join(p.get("positionsDetailed") or [p.get("position") or ""]),nat=(p.get("country") or {}).get("name"),h=p.get("height"),foot=(p.get("preferredFoot") or "")[:1],ct=ct,mv=p.get("proposedMarketValue"),teamNow=(p.get("team") or {}).get("name")))
json.dump(out,open("deep.json","w"),ensure_ascii=False); print(len(out)); print(sorted(out,key=lambda x:-(x["g"] or 0))[:5])
