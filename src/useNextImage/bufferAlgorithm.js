const MAXIMUM_IMAGE_BUFFER_COUNT = 10

const bufferAlgorithm = (viewedCount, loadingCount) => {
  if (viewedCount < MAXIMUM_IMAGE_BUFFER_COUNT - 3) {
    return 3
  } else {
    return MAXIMUM_IMAGE_BUFFER_COUNT - loadingCount
  }
}

export { MAXIMUM_IMAGE_BUFFER_COUNT }
export default bufferAlgorithm
