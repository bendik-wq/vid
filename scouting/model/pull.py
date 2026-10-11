import json,os,time,urllib.request
from concurrent.futures import ThreadPoolExecutor
UA={"User-Agent":"Mozilla/5.0"}
os.makedirs("cache",exist_ok=True)
def get(path):
    fn="cache/"+str(abs(hash(path)))+".json"
    fn="cache/"+path.replace("/","_").replace("?","_").replace("&","_").replace(",","")[:220]+".json"
    if os.path.exists(fn): return json.load(open(fn))
    err=None
    for i in range(4):
        try:
            d=json.load(urllib.request.urlopen(urllib.request.Request("https://api.sofascore.com/api/v1/"+path,headers=UA),timeout=30))
            json.dump(d,open(fn,"w")); return d
        except Exception as e:
            err=e; time.sleep(2*(i+1))
    return {"error":str(err)}
# key: (tid, season id, label, region, league factor)
LEAGUES=[
 (20,87809,"Eliteserien 2026","Nordics",1.00),(40,87925,"Allsvenskan 2026","Nordics",1.00),
 (39,76491,"Superliga DK 25/26","Nordics",1.05),(46,87924,"Superettan 2026","Nordics",0.80),
 (41,87930,"Veikkausliiga 2026","Nordics",0.80),(188,89094,"Besta deild 2026","Nordics",0.75),
 (22,87867,"OBOS-ligaen 2026","Nordics",0.80),
 (37,77012,"Eredivisie 25/26","Western/Central Europe",1.15),(131,77156,"Eerste Divisie 25/26","Western/Central Europe",0.88),
 (38,77040,"Belgian Pro League 25/26","Western/Central Europe",1.15),(9,77849,"Challenger Pro League 25/26","Western/Central Europe",0.88),
 (45,77382,"Austrian Bundesliga 25/26","Western/Central Europe",1.05),(135,77531,"Austrian 2. Liga 25/26","Western/Central Europe",0.80),
 (215,77152,"Swiss Super League 25/26","Western/Central Europe",1.05),(216,77150,"Swiss Challenge League 25/26","Western/Central Europe",0.82),
 (44,77354,"2. Bundesliga 25/26","Western/Central Europe",1.10),(491,77744,"3. Liga 25/26","Western/Central Europe",0.88),
 (36,77128,"Scottish Premiership 25/26","Western/Central Europe",1.00),(206,77037,"Scottish Championship 25/26","Western/Central Europe",0.82),
 (192,87682,"League of Ireland 2026","Western/Central Europe",0.78),(182,77357,"Ligue 2 25/26","Western/Central Europe",1.02),
 (170,76980,"HNL 25/26","Eastern/Southern Europe",1.00),(212,77283,"PrvaLiga SVN 25/26","Eastern/Southern Europe",0.88),
 (210,76909,"Serbian SuperLiga 25/26","Eastern/Southern Europe",0.95),(172,77019,"Czech First League 25/26","Eastern/Southern Europe",1.05),
 (211,77154,"Slovak Niké Liga 25/26","Eastern/Southern Europe",0.92),(202,76477,"Ekstraklasa 25/26","Eastern/Southern Europe",1.00),
 (187,76944,"Hungarian NB I 25/26","Eastern/Southern Europe",0.92),(152,77312,"Romanian SuperLiga 25/26","Eastern/Southern Europe",0.92),
 (247,76882,"Bulgarian Parva Liga 25/26","Eastern/Southern Europe",0.85),(185,78175,"Greek Super League 25/26","Eastern/Southern Europe",1.05),
 (238,77806,"Liga Portugal 25/26","Eastern/Southern Europe",1.15),(239,77801,"Liga Portugal 2 25/26","Eastern/Southern Europe",0.88),
 (54,77558,"LaLiga 2 25/26","Eastern/Southern Europe",1.05),(53,79502,"Serie B 25/26","Eastern/Southern Europe",1.05),
 (242,86668,"MLS 2026","Outside Europe",1.00),(390,89840,"Brasileirão Série B 2026","Outside Europe",0.98),
 (325,87678,"Brasileirão Série A 2026","Outside Europe",1.15),(155,87913,"Argentina LPF 2026","Outside Europe",1.10),
 (278,89288,"Uruguay Primera 2026","Outside Europe",0.93),(11539,88503,"Colombia Primera A 2026","Outside Europe",0.97),
 (196,87931,"J1 League 2026","Outside Europe",1.05),(410,88606,"K League 1 2026","Outside Europe",0.97),
 (136,82603,"A-League 25/26","Outside Europe",0.88),(358,79701,"South Africa Premiership 25/26","Outside Europe",0.85),
 (937,78750,"Botola Pro 25/26","Outside Europe",0.85),
]
FIELDSETS=[
 "minutesPlayed,appearances,goals,assists,expectedGoals,expectedAssists,rating,totalShots",
 "tackles,interceptions,ballRecovery,possessionWonAttThird,dribbledPast,clearances,errorLeadToShot,errorLeadToGoal",
 "aerialDuelsWon,aerialDuelsWonPercentage,totalDuelsWonPercentage,groundDuelsWonPercentage,accuratePassesPercentage,accurateLongBalls,keyPasses,bigChancesCreated",
 "successfulDribbles,accurateCrosses,accurateFinalThirdPasses,touches,bigChancesMissed,penaltyGoals,accuratePasses,yellowCards",
]
def league(L):
    tid,sid,label,region,f=L
    rows={}
    for fs in FIELDSETS:
        off=0
        while True:
            d=get(f"unique-tournament/{tid}/season/{sid}/statistics?limit=100&offset={off}&order=-minutesPlayed&accumulation=total&fields={fs}&filters=minutesPlayed.GT.899")
            res=d.get("results",[])
            for r in res:
                pid=r["player"]["id"]
                row=rows.setdefault(pid,{"pid":pid,"name":r["player"]["name"],"team":r["team"]["name"],"league":label,"region":region,"lf":f})
                row.update({k:v for k,v in r.items() if k not in("player","team")})
            if len(res)<100 or d.get("page",1)>=d.get("pages",1): break
            off+=100
    return label,list(rows.values()),None
if __name__=="__main__":
  out=[]
  with ThreadPoolExecutor(6) as ex:
      for label,rows,_ in ex.map(league,LEAGUES):
        print(label,len(rows)); out+=rows
  json.dump(out,open("pool.json","w"))
  print("total",len(out))
