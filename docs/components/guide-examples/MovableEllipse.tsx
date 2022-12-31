"use client"

// prettier-ignore
import { Mafs, Ellipse, Circle, CartesianCoordinates, useMovablePoint, Theme, vec } from "mafs"

export default function MovableEllipse() {
  const rotationHintRadius = 3

  // This center point translates everything else.
  const center = useMovablePoint([0, 0], {
    color: Theme.orange,
  })
  const translation = vec
    .matrixBuilder()
    .translate(center.x, center.y)
    .get()

  // This outer point rotates the ellipse, and
  // is also translated by the center point.
  // Its position is used to build a rotation matrix.
  const rotate = useMovablePoint([rotationHintRadius, 0], {
    color: Theme.blue,
    transform: translation,
    // Constrain this point to only move in a circle
    constrain: (position) =>
      vec.scale(
        vec.normalize(position),
        rotationHintRadius
      ),
  })
  const angle = Math.atan2(rotate.point[1], rotate.point[0])
  const rotation = vec.matrixBuilder().rotate(angle).get()

  // Lastly, these two points are rotated and translated
  // according to the outer two points.
  const width = useMovablePoint([2, 0], {
    transform: vec.matrixMult(translation, rotation),
    constrain: "horizontal",
  })
  const height = useMovablePoint([0, 1], {
    transform: vec.matrixMult(translation, rotation),
    constrain: "vertical",
  })

  return (
    <Mafs height={500}>
      <CartesianCoordinates />

      {/*
       * Display a little hint that the
       * point is meant to move radially
       */}
      <Circle
        center={center.point}
        radius={rotationHintRadius}
        strokeStyle="dashed"
        strokeOpacity={0.3}
        fillOpacity={0}
      />

      <Ellipse
        center={center.point}
        radius={[Math.abs(width.x), Math.abs(height.y)]}
        angle={angle}
      />

      {center.element}
      {width.element}
      {height.element}
      {rotate.element}
    </Mafs>
  )
}
