import { Button } from "@/components/ui/button";
import Layout from "./Dashboard/Layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Home = (user) => {
    return (
        <>
            <h1 className="text-indigo-500">TESt</h1>
            <Button variant="outline">t</Button>
        </>
    );
};

Home.layout = (page) => <Layout children={page} />;

export default Home;
