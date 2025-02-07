import "./style.scss"

const MainPage = () => {
  return (
    <div className="main">
      <div className="main__img">
        <img src="static/images/main-photo.png" alt="main-photo" />
      </div>
      <div className="main__info">
        <h1>Tabihunt.kz — ваш надежный партнер в мире охоты!</h1>
        <p>
          Наш портал специально создан для субъектов охотничьих хозяйств в
          Республике Казахстан. Здесь вы можете продавать путевки на охоту
          онлайн и эффективно контролировать изъятие животных ресурсов в рамках
          полученных лимитов.
        </p>
        <p>
          Мы предлагаем удобную платформу для ваших потребностей, обеспечивая
          прозрачные и безопасные сделки.
        </p>
        <p>
          Присоединяйтесь к Tabihunt.kz и откройте для себя новые возможности в
          охотничьем бизнесе!
        </p>
      </div>
    </div>
  )
}

export default MainPage
