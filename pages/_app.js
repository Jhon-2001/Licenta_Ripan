import "../styles/globals.css";
import Layout from "../components/Layout";
import { DataProvider } from '../store/GlobalState'
import "../styles/styless.css";

function MyApp({ Component, pageProps }) {
	return (
		<DataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
	);
}

export default MyApp;
