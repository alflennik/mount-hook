const loadImageElement = async () => {
  const imageUrl = await (await fetch('/lolrandom-images')).text()

  return new Promise(resolve => {
    const imageElement = new Image()
    imageElement.onload = () => {
      resolve(imageElement)
    }
    if (navigator.userAgent.includes('jsdom')) {
      resolve(imageElement) // onload not present in jsdom
    }
    imageElement.src = imageUrl
    imageElement.alt =
      'Lolrandom is a collection of thousands of images scoured from across the ' +
      'internet in an endeavor costing years. There are ancient alchemical diagrams, gifs of ' +
      'people getting kicked in the balls, sizzling bacon, pulsating geometric shapes, and, ' +
      'occasionally, boobs. Each is presented without a single shred of context, the one ' +
      'exception being this alt text you’re reading now. That there is no alt text for each ' +
      `image is a genuine tragedy, and I sincerely apologize. Here's one: "A boy's torso ` +
      `protrudes from the carpet, his body missing. He is eating a chicken nugget. A pet dog ` +
      `looks on. The door to the room is opening." And another: "Text reads, 'took my friend's ` +
      `vape because it is addictive and unhealthy. now he's acting like he can't breathe because ` +
      `i won't give it back. disgusting.' Below, there is a picture of a hand holding an asthma ` +
      `inhaler." And one more: "It is a box of pet treats. The title is not visible but we see ` +
      `the description, 'All natural calming product. Bite size soft chews. Helps anxiety and ` +
      `nervous behavior.' The cat and dog shown look incredibly relaxed, their eyelids half ` +
      `shut. It is clear they are stoned." I want to note how wonderful it would be to make a ` +
      'Lolrandom for audio, or text. For now, all we have is images.'
  })
}

export default loadImageElement
