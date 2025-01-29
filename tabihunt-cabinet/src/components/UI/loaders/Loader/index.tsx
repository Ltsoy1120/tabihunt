import "./style.scss"

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__icon-wrapper">
        <div className="loader__icon"></div>
      </div>

      <p>Подождите, идет загрузка данных</p>
    </div>
  )
}

export default Loader
