import json,math,os
from collections import defaultdict,Counter
from pull import LEAGUES
OUT=os.path.join(os.path.dirname(os.path.abspath(__file__)),"..","..","docs","brann","data"); os.makedirs(OUT,exist_ok=True)
o=json.load(open("scored_all.json"))
T2=["Superettan","OBOS","Eerste","Challenger","Austrian 2.","Swiss Challenge","2. Bundesliga","Scottish Championship","Ligue 2","Liga Portugal 2","LaLiga 2","Serie B 25/26","Série B","Championship","Primera Nacional","Colombia Primera B","Uruguay Segunda","Ecuador Serie B"]
T3=["3. Liga","League One","National (FRA)","Serie C","Primera Federación","Série C"]
def tier(l):
    if l.startswith("League Two"): return 4
    if l.startswith("National League"): return 5
    if any(l.startswith(t) for t in T3): return 3
    if any(l.startswith(t) for t in T2): return 2
    return 1
COUNTRY={"Eliteserien":"Norway","OBOS":"Norway","Allsvenskan":"Sweden","Superettan":"Sweden","Superliga DK":"Denmark","Veikkausliiga":"Finland","Besta":"Iceland",
 "Eredivisie":"Netherlands","Eerste":"Netherlands","Belgian":"Belgium","Challenger":"Belgium","Austrian":"Austria","Swiss":"Switzerland","Bundesliga":"Germany","2. Bundesliga":"Germany","3. Liga":"Germany",
 "Scottish":"Scotland","League of Ireland":"Ireland","Ligue":"France","National (FRA)":"France","HNL":"Croatia","PrvaLiga":"Slovenia","Serbian":"Serbia","Czech":"Czechia","Slovak":"Slovakia",
 "Ekstraklasa":"Poland","Hungarian":"Hungary","Romanian":"Romania","Bulgarian":"Bulgaria","Greek":"Greece","Liga Portugal":"Portugal","LaLiga":"Spain","Primera Federación":"Spain","Serie A":"Italy","Serie B":"Italy","Serie C":"Italy",
 "MLS":"USA","Brasileirão":"Brazil","Argentina":"Argentina","Uruguay":"Uruguay","Colombia":"Colombia","J1":"Japan","K League":"South Korea","A-League":"Australia","South Africa":"South Africa","Botola":"Morocco",
 "Premier League":"England","Championship":"England","League One":"England","League Two":"England","National League":"England","Ecuador":"Ecuador","Peru":"Peru","Chile":"Chile","Paraguay":"Paraguay"}
def country(l):
    best=max((k for k in COUNTRY if l.startswith(k)),key=len,default=None); return COUNTRY.get(best,"")
best={}
for x in o:
    if x["id"] not in best or x["min"]>best[x["id"]]["min"]: best[x["id"]]=x
U=list(best.values())
for x in U:
    x["tier"]=tier(x["league"]); x["country"]=country(x["league"])
    x["brann"]= x["team"]=="SK Brann" and x["teamNow"]=="SK Brann"
    x["noclub"]= x["teamNow"]=="No team"
# Moneyball: per role, regress Brann score on log10(value) for players <=27 with a value
coef={}
for role in "CB FB CM W ST".split():
    pts=[(math.log10(x["mv"]),x["adj"]) for x in U if x["role"]==role and x["age"]<=27 and (x["mv"] or 0)>=20000]
    n=len(pts); mx=sum(p[0] for p in pts)/n; my=sum(p[1] for p in pts)/n
    b=sum((p[0]-mx)*(p[1]-my) for p in pts)/sum((p[0]-mx)**2 for p in pts); a=my-b*mx
    coef[role]=(round(a,3),round(b,3))
for x in U:
    a,b=coef[x["role"]]; x["exp"]=round(a+b*math.log10(max(x["mv"] or 20000,20000)),1); x["resid"]=round(x["adj"]-x["exp"],1)
print("coef",coef)
sel={}
def add(xs,tag):
    for x in xs: sel.setdefault(x["id"],x).setdefault("tags",set()).add(tag)
for role in "CB FB CM W ST".split():
    R=[x for x in U if x["role"]==role]
    add([x for x in R if x["brann"]],"brann")
    add(sorted([x for x in R if x["age"]<27 and (x["mv"] or 0)<=6e6],key=lambda x:-x["adj"])[:350],"board")
    add(sorted([x for x in R if x["age"]<=31 and (x["mv"] or 0)<=4e6 and (x["noclub"] or (x["ct"] and x["ct"]<="2027-06"))],key=lambda x:-x["adj"])[:250],"fa")
    add(sorted([x for x in R if x["tier"]>=2 and x["age"]<27 and (x["mv"] or 0)<=6e6],key=lambda x:-x["adj"])[:150],"deep")
    add(sorted([x for x in R if x["age"]<=21.5 and 2e4<=(x["mv"] or 0)<=6e6],key=lambda x:-x["resid"])[:250],"pro")
C=["id","name","role","pos","age","nat","h","foot","ct","mv","team","teamNow","league","region","country","tier","lf","min","apps","g","a","xg","rating","fit","adj","cov","exp","resid","pct","m","tags"]
rows=[[ (sorted(x[c]) if c=="tags" else ((x[c] or "")[:1] if c=="foot" else ("/".join(x[c]) if c=="pos" else x.get(c)))) for c in C] for x in sel.values()]
json.dump({"cols":C,"rows":rows},open(f"{OUT}/players.json","w"),separators=(",",":"),ensure_ascii=False)
lg=[]
cnt=Counter(x["league"] for x in o)
for l in LEAGUES: lg.append([l[2],l[3],l[4],tier(l[2]),country(l[2]),cnt.get(l[2],0)])
deep=json.load(open("deep.json"))
meta={"generated":"2026-10-11","players_scored":len(U),"player_seasons":len(o),"leagues":lg,"coef":coef,
      "deep":[[d["name"],d["pos"],d["age"],d["nat"],d["h"],d["foot"],d["ct"],d["mv"],d["team"],d["teamNow"],d["league"],d["g"],d["pid"]] for d in deep]}
json.dump(meta,open(f"{OUT}/meta.json","w"),separators=(",",":"),ensure_ascii=False)
print(len(rows),os.path.getsize(f"{OUT}/players.json")//1024,"KB", Counter(t for x in sel.values() for t in x["tags"]))
print("tiers",Counter(x["tier"] for x in U))
for role in "CB FB CM W ST".split():
    print(role,"PRO",[ (x["name"],x["age"],x["league"][:18],x["resid"]) for x in sorted([x for x in U if x["role"]==role and x["age"]<=21.5 and 2e4<=(x["mv"] or 0)<=6e6 and x["cov"]>=.7 and x["teamNow"]==x["team"]],key=lambda x:-x["resid"])[:4]])
    print(role,"FA",[ (x["name"],x["age"],x["teamNow"][:14],x["ct"],x["adj"]) for x in sorted([x for x in U if x["role"]==role and x["age"]<=31 and (x["mv"] or 0)<=3e6 and x["cov"]>=.7 and (x["noclub"] or (x["ct"] and x["ct"]<="2027-06"))],key=lambda x:-x["adj"])[:4]])
