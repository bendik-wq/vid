import json,datetime,bisect
from collections import defaultdict,Counter
pool=json.load(open("pool.json")); P=json.load(open("pos.json")); D={int(k):v for k,v in json.load(open("details.json")).items()}
NOW=datetime.datetime(2026,10,11)
ROLE_OF={"DC":"CB","DL":"FB","DR":"FB","DM":"CM","MC":"CM","LW":"W","RW":"W","ML":"W","MR":"W","ST":"ST","AM":None}
def v(r,k):
    x=r.get(k); return None if x is None else float(x)
def p90(r,k):
    x=v(r,k); return None if x is None else x/r["minutesPlayed"]*90
METRICS={  # name: (function, higher_is_better, label, unit)
 "tklint90":(lambda r: None if v(r,"tackles") is None or v(r,"interceptions") is None else (v(r,"tackles")+v(r,"interceptions"))/r["minutesPlayed"]*90,1,"Tackles + interceptions","/90"),
 "tkl90":(lambda r:p90(r,"tackles"),1,"Tackles","/90"),
 "int90":(lambda r:p90(r,"interceptions"),1,"Interceptions","/90"),
 "recov90":(lambda r:p90(r,"ballRecovery"),1,"Ball recoveries","/90"),
 "att3_90":(lambda r:p90(r,"possessionWonAttThird"),1,"Possession won in final third","/90"),
 "dribpast90":(lambda r:p90(r,"dribbledPast"),0,"Dribbled past","/90"),
 "err90":(lambda r: None if v(r,"errorLeadToShot") is None else ((v(r,"errorLeadToShot") or 0)+(v(r,"errorLeadToGoal") or 0))/r["minutesPlayed"]*90,0,"Errors leading to shot/goal","/90"),
 "aerw90":(lambda r:p90(r,"aerialDuelsWon"),1,"Aerials won","/90"),
 "aer%":(lambda r:v(r,"aerialDuelsWonPercentage"),1,"Aerial win %","%"),
 "ground%":(lambda r:v(r,"groundDuelsWonPercentage"),1,"Ground duel win %","%"),
 "duel%":(lambda r:v(r,"totalDuelsWonPercentage"),1,"Duel win %","%"),
 "pass%":(lambda r:v(r,"accuratePassesPercentage"),1,"Pass accuracy","%"),
 "long90":(lambda r:p90(r,"accurateLongBalls"),1,"Accurate long balls","/90"),
 "kp90":(lambda r:p90(r,"keyPasses"),1,"Key passes","/90"),
 "bcc90":(lambda r:p90(r,"bigChancesCreated"),1,"Big chances created","/90"),
 "xa90":(lambda r:p90(r,"expectedAssists"),1,"xA","/90"),
 "xg90":(lambda r:p90(r,"expectedGoals"),1,"xG","/90"),
 "npg90":(lambda r: None if v(r,"goals") is None else (v(r,"goals")-(v(r,"penaltyGoals") or 0))/r["minutesPlayed"]*90,1,"Non-penalty goals","/90"),
 "fin90":(lambda r: None if v(r,"expectedGoals") is None else (v(r,"goals")-v(r,"expectedGoals"))/r["minutesPlayed"]*90,1,"Goals minus xG","/90"),
 "shots90":(lambda r:p90(r,"totalShots"),1,"Shots","/90"),
 "drib90":(lambda r:p90(r,"successfulDribbles"),1,"Successful dribbles","/90"),
 "cross90":(lambda r:p90(r,"accurateCrosses"),1,"Accurate crosses","/90"),
 "f3p90":(lambda r:p90(r,"accurateFinalThirdPasses"),1,"Accurate final-third passes","/90"),
}
WEIGHTS={
 "CB":{"dribpast90":15,"tklint90":15,"ground%":15,"pass%":15,"recov90":10,"aer%":10,"err90":10,"aerw90":5,"long90":5},
 "FB":{"pass%":20,"int90":15,"duel%":15,"tkl90":10,"xa90":10,"kp90":10,"dribpast90":10,"cross90":5,"recov90":5},
 "CM":{"tklint90":20,"att3_90":15,"recov90":10,"kp90":10,"xa90":10,"pass%":10,"f3p90":10,"duel%":10,"xg90":5},
 "W":{"xg90":15,"att3_90":15,"shots90":10,"drib90":10,"kp90":10,"xa90":10,"bcc90":10,"tkl90":10,"npg90":10},
 "ST":{"xg90":25,"npg90":15,"aerw90":15,"att3_90":15,"fin90":10,"xa90":10,"tkl90":5,"kp90":5},
}
rows=[]
for r in pool:
    if P.get(f'{r["league"]}|{r["pid"]}')=="G": continue
    d=D.get(r["pid"]); 
    if not d or not d.get("positionsDetailed"): continue
    role=ROLE_OF.get(d["positionsDetailed"][0])
    if not role: continue
    r=dict(r); r["role"]=role; r["d"]=d
    r["m"]={k:f(r) for k,(f,_,_,_) in METRICS.items()}
    rows.append(r)
by=defaultdict(list)
for r in rows: by[r["role"]].append(r)
for role,rs in by.items():
    W=WEIGHTS[role]
    dist={k:sorted(x["m"][k] for x in rs if x["m"][k] is not None) for k in W}
    for x in rs:
        pct={}
        for k in W:
            val=x["m"][k]
            if val is None or not dist[k]: continue
            lo=bisect.bisect_left(dist[k],val); hi=bisect.bisect_right(dist[k],val)
            p=100*((lo+hi)/2)/len(dist[k])
            pct[k]=p if METRICS[k][1] else 100-p
        got=sum(W[k] for k in pct); cov=got/sum(W.values())
        raw=sum(pct[k]*W[k] for k in pct)/got if got else 50
        fit=50+(raw-50)*cov  # shrink toward average when data is missing
        x["pct"]=pct; x["cov"]=cov; x["fit"]=fit; x["adj"]=fit*x["lf"]
out=[]
for r in rows:
    d=r["d"]
    if not d.get("dateOfBirth"): continue
    dob=datetime.datetime.fromisoformat(d["dateOfBirth"][:10]); age=(NOW-dob).days/365.25
    ct=d.get("contractUntilTimestamp"); ct=datetime.datetime.utcfromtimestamp(ct).strftime("%Y-%m") if ct else None
    out.append(dict(id=r["pid"],name=d["name"] or r["name"],slug=d.get("slug"),role=r["role"],pos=d["positionsDetailed"],age=round(age,1),dob=d["dateOfBirth"][:10],
      nat=d.get("country"),h=d.get("height"),foot=d.get("preferredFoot"),ct=ct,mv=d.get("proposedMarketValue"),team=r["team"],teamNow=d.get("teamNow"),
      league=r["league"],region=r["region"],lf=r["lf"],min=int(r["minutesPlayed"]),apps=r.get("appearances"),g=r.get("goals"),a=r.get("assists"),
      xg=r.get("expectedGoals"),rating=r.get("rating"),fit=round(r["fit"],1),adj=round(r["adj"],1),cov=round(r["cov"],2),
      pct={k:round(p) for k,p in r["pct"].items()},m={k:(None if r["m"][k] is None else round(r["m"][k],2)) for k in WEIGHTS[r["role"]]}))
json.dump(out,open("scored_all.json","w"))
print(Counter(o["role"] for o in out))
for role in WEIGHTS:
    top=sorted([o for o in out if o["role"]==role and o["age"]<27],key=lambda o:-o["adj"])[:15]
    print("\n==",role)
    for o in top: print(f'{o["adj"]:5.1f} fit{o["fit"]:5.1f} cov{o["cov"]:.2f} {o["name"]:<26} {o["age"]:4} {o["teamNow"] or "-":<22} {o["league"]:<28} mv{(o["mv"] or 0)/1e6:4.1f} ct{o["ct"]}')
