/**
 * Плавная прокрутка к элементу на странице
 * @param elementId - ID элемента (без #)
 * @param offset - Отступ сверху (по умолчанию 80px для header)
 */
export const smoothScrollTo = (elementId: string, offset: number = 80) => {
  const targetElement = document.getElementById(elementId)

  if (targetElement) {
    const elementPosition = targetElement.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

/**
 * Обработчик клика по ссылке с плавной прокруткой
 * @param e - Event клика
 * @param href - href ссылки (с # или без)
 * @param offset - Отступ сверху
 */
export const handleSmoothScroll = (
  e: React.MouseEvent<HTMLAnchorElement>, 
  href: string, 
  offset: number = 80
) => {
  e.preventDefault()
  const targetId = href.replace('#', '')
  smoothScrollTo(targetId, offset)
}