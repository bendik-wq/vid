import json,sys,time
from pull import get
from concurrent.futures import ThreadPoolExecutor
d=json.load(open("pool.json")); P=json.load(open("pos.json"))
ids=sorted({r["pid"] for r in d if P.get(f'{r["league"]}|{r["pid"]}')!="G"})
n=int(sys.argv[1]) if len(sys.argv)>1 else len(ids)
t=time.time()
def f(i):
    x=get(f"player/{i}"); return i,x.get("player")
out={}
with ThreadPoolExecutor(10) as ex:
    for i,p in ex.map(f,ids[:n]):
        if p: out[i]={k:p.get(k) for k in("name","position","positionsDetailed","height","dateOfBirth","preferredFoot","contractUntilTimestamp","proposedMarketValue","slug")}|{"teamNow":(p.get("team") or {}).get("name"),"country":(p.get("country") or {}).get("name")}
print(len(ids),n,len(out),round(time.time()-t,1),"s")
if n==len(ids): json.dump(out,open("details.json","w"))
