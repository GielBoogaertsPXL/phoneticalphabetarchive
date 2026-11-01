// v-reveal: fades an element in once 45% of it is on screen.
// Optional value = delay in ms, e.g. v-reveal="150"
const VISIBLE = 0.45

const observer =
  typeof IntersectionObserver === 'undefined'
    ? null
    : new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const needed = entry.target.__revealNeeded ?? VISIBLE
            if (!entry.isIntersecting || entry.intersectionRatio < needed - 0.01) continue
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        },
        // Very tall elements can never be 45% visible, so lower the bar for those
        { threshold: [0.1, 0.2, 0.3, VISIBLE] },
      )

export default {
  mounted(el, binding) {
    if (!observer) return
    el.classList.add('reveal')
    if (binding.value) el.style.animationDelay = `${binding.value}ms`

    // Tall elements: reveal as soon as the 0.3 threshold (or less) is reached
    const needed = Math.min(VISIBLE, (window.innerHeight * 0.9) / (el.offsetHeight || 1))
    el.__revealNeeded = needed
    observer.observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
