# Slope

An endless downhill runner in a single HTML file — no build step, no dependencies.
Open `index.html` in a browser and play.

## How to play

- Steer with the arrow keys or `A` / `D`; on touch, drag anywhere on screen.
- Keep the ball on the track: red blocks kill you, so do the gaps in the floor and
  the edges of the track.
- The track curves, so it pulls you sideways — you have to steer to hold a line.
- Speed climbs with distance. Score is distance travelled; the best run is kept in
  `localStorage`.

## How it works

Everything renders to a 2D canvas through a hand-written perspective projection
(`project()` in `index.html`), so there is no WebGL or 3D library involved.

- The track's centreline and height are pure functions of `z` (`centerX`,
  `groundY`), so the world is infinite and needs no storage — any segment can be
  recomputed from its depth alone.
- The floor is drawn as depth-sorted quads from far to near with distance fog,
  split into left and right halves so a hole can remove one side.
- Obstacles live on a rolling list, spawned ahead of the camera and dropped once
  behind it. Spawn density and speed both ramp with distance.
