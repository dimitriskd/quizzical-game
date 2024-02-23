import topShape from "/shape-1.png";
import bottomShape from "/shape-2.png";
import "../styles/Background.css"

export default function Background(props) {
  const darkTop = {
    filter: 'brightness(0) saturate(100%) invert(24%) sepia(85%) saturate(3290%) hue-rotate(344deg) brightness(90%) contrast(107%) drop-shadow(0px -10px 40px #ec1a26)'
  };

  const darkBottom = {
    filter: 'brightness(0) saturate(100%) invert(30%) sepia(87%) saturate(1153%) hue-rotate(205deg) brightness(95%) contrast(97%) drop-shadow(-22px 20px 45px #345fd7)',
  };


  return (
    <section className="bg">
      <img
        src={topShape}
        className="topStyle"
        alt="Background Image Shape"
        style={props.darkMode ? darkTop : null}
      />
      <img
        src={bottomShape}
        className="bottomStyle"
        alt="Background Image Shape"
        style={props.darkMode ? darkBottom : null}
      />
    </section>
  )
}