# Brann style-fit model

Pipeline that builds the data behind `docs/brann/` (the scouting site).

1. `pull.py`: league statistics from Sofascore for every league in `LEAGUES` (900+ minutes), saved to `pool.json`.
2. `pos.py`: Sofascore position group per player (to drop goalkeepers).
3. `det.py`: player details (age, positions, foot, contract, value, current club).
4. `score.py`: role assignment, percentiles, style fit, coverage shrink and league factor, saved to `scored_all.json`.
5. `deep.py`: goals-only top-scorer lists for the Regionalliga groups and Brazil's Série D.
6. `build_data.py`: dedupes players, fits the Moneyball value line, tags board, free-agent, prospect and lower-tier sets, and writes `docs/brann/data/`.
7. `build_report.py`: renders the markdown report into `docs/brann/report.html`.
8. `build_artifact.py <dir>`: stages the site as a multi-file Claude artifact.

Run steps 1 to 6 from a working directory that holds the cache (`cache/`) and the intermediate JSON files. Run steps 7 and 8 from anywhere.
