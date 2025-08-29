import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "../../components/shopping-view/address";
import ShoppingOrders from "../../components/shopping-view/orders";

function ShoppingAccount() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">My Account</h1>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8 px-4 lg:px-8 max-w-6xl">
        <div className="flex flex-col rounded-lg border border-black bg-white p-6 lg:p-8 shadow-sm">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="orders" className="text-black">Orders</TabsTrigger>
              <TabsTrigger value="address" className="text-black">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="mt-0">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address" className="mt-0">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;