"use client"

import {
  CartesianCoordinates,
  FunctionGraph,
  Mafs,
  useMovablePoint,
  vec,
} from "mafs"

export default function FancyParabola() {
  const a = useMovablePoint([-1, 0], {
    constrain: "horizontal",
  })
  const b = useMovablePoint([1, 0], {
    constrain: "horizontal",
  })

  const k = useMovablePoint([0, -1], {
    constrain: "vertical",
    transform: vec
      .matrixBuilder()
      .translate((a.x + b.x) / 2, 0)
      .get(),
  })

  const mid = (a.x + b.x) / 2
  const fn = (x: number) => (x - a.x) * (x - b.x)

  return (
    <Mafs>
      <CartesianCoordinates subdivisions={2} />

      <FunctionGraph.OfX
        y={(x) => (k.y * fn(x)) / fn(mid)}
      />
      {a.element}
      {b.element}
      {k.element}
    </Mafs>
  )
}
