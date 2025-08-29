import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
        selectedId?._id === addressInfo?._id
          ? "border-2 border-black bg-gray-100 shadow-lg"
          : "border border-black hover:border-black hover:shadow-md"
      }`}
    >
      <CardContent className="p-6 space-y-3">
        {selectedId?._id === addressInfo?._id && (
          <div className="flex items-center gap-2 text-black font-semibold mb-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Selected Address
          </div>
        )}
        <div className="space-y-2">
          <Label className="text-black font-medium">Address: {addressInfo?.address}</Label>
          <Label className="text-black font-medium">City: {addressInfo?.city}</Label>
          <Label className="text-black font-medium">Pincode: {addressInfo?.pincode}</Label>
          <Label className="text-black font-medium">Phone: {addressInfo?.phone}</Label>
          {addressInfo?.notes && (
            <Label className="text-black font-medium">Notes: {addressInfo?.notes}</Label>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between gap-3">
        <Button 
          onClick={() => handleEditAddress(addressInfo)}
          className="flex-1 bg-black text-white hover:bg-gray-800"
        >
          Edit
        </Button>
        <Button 
          onClick={() => handleDeleteAddress(addressInfo)}
          variant="outline"
          className="flex-1 border border-black hover:bg-gray-100"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;