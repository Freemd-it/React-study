import Layout from './components/MyLayout';

class SSRTest extends React.Component {
    static async getInitialProps ({req}) {
        return req 
            ? { from: 'server' } // 서버에서 실행 할 시
            : { from: 'client '} // 클라이언트에서 실행 할 시
    }

    render() {
        return (
            <div>
                {console.log(this.props)}
                {this.props.from} 에서 실행이 되었어요.
                <style jsx>{`
                  div {
                    margin: 20px;
                    border: 1px solid black;
                  }
                  `}</style>
            </div>
        );
    }
}

export default SSRTest;