from pull import get,LEAGUES
import json
from concurrent.futures import ThreadPoolExecutor
def job(a):
    (tid,sid,label,_,_),p=a; ids=[]; off=0
    while True:
        d=get(f"unique-tournament/{tid}/season/{sid}/statistics?limit=100&offset={off}&order=-minutesPlayed&accumulation=total&fields=minutesPlayed&filters=minutesPlayed.GT.899%2Cposition.in.{p}")
        res=d.get("results",[]); ids+=[r["player"]["id"] for r in res]
        if len(res)<100: break
        off+=100
    return label,p,ids
P={}
with ThreadPoolExecutor(6) as ex:
    for label,p,ids in ex.map(job,[(L,p) for L in LEAGUES for p in "GDMF"]):
        for i in ids: P[f"{label}|{i}"]=p
json.dump(P,open("pos.json","w")); print(len(P))
