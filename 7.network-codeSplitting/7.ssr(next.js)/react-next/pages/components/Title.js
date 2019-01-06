const Title = () => (
  <p>
    이곳은 제목 입니다.
    <style jsx>{`
    p {
      font-size: 50px;
      margin: 10px;
    }
  `}</style>
  <style jsx global>{`
    li {
      background-color: yellow;
    }
  `}</style>
  </p>
  )

export default Title