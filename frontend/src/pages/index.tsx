import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-3">
        <Card>
          <CardHeader>
            <h1>this is heading</h1>
          </CardHeader>
          <Divider />

          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
          <Divider />

          <CardFooter>
            <p>this is footer</p>
          </CardFooter>
        </Card>
      </div>
    </DefaultLayout>
  );
}
