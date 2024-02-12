function getRelativePointerPosition(node) {
    const transform = node.getAbsoluteTransform().copy()
    transform.invert()
    return transform.point(node.getPointerPosition())
}
export { getRelativePointerPosition }