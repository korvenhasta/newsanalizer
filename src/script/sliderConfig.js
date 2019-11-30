export const sliderConfig = {
  type: 'carousel',
  startAt: 0,
  perView: 3,
  peek: 88,
  focusAt: 0,
  gap: 16,
  breakpoints: {
    1440: {
      type: "carousel",
      perView: 3,
      startAt: 0,
      focusAt: 0,
      gap: 16
    },
    768: {
      type: "slider",
      perView: 2,
      startAt: 0,
      focusAt: 0,
      peek: {
        before: 0,
        after: 70
      },
      gap: 8
    },
    576: {
      type: "slider",
      perView: 1,
      startAt: 0,
      focusAt: 0,
      peek: {
        before: 0,
        after: 32
      },
      gap: 8
    }
  }
}
