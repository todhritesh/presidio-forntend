import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocation, useNavigation } from "react-router-dom"

function ViewPropertyDetails() {
    const { state: item } = useLocation()


    return (
        <div className="flex w-full flex-1 my-4 justify-center">

            <Card className="max-w-[500px] min-w-[380px]">
                <CardHeader>
                    <CardTitle>{item?.propertyTitle}</CardTitle>
                    <CardDescription >{item?.description}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">

                    <div
                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                                Address
                            </p>
                            <p className="text-sm font-medium leading-none">
                                {item?.fullAddress}
                            </p>
                        </div>
                    </div>
                    <div
                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                                No. Bedrooms
                            </p>
                            <p className="text-sm font-medium leading-none">
                                {item?.noOfBedroom}
                            </p>
                        </div>
                    </div>
                    <div
                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                                Price
                            </p>
                            <p className="text-sm font-medium leading-none">
                                {item?.price}
                            </p>
                        </div>
                    </div>
                    <div
                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                                No. of Bathrooms
                            </p>
                            <p className="text-sm font-medium leading-none">
                                {item?.noOfBathroom}
                            </p>
                        </div>
                    </div>
                    <div
                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                                Contact Name
                            </p>
                            <p className="text-sm font-medium leading-none">
                                {item?.contactName}
                            </p>
                        </div>
                    </div>
                    <div
                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                                Contact Email
                            </p>
                            <p className="text-sm font-medium leading-none">
                                {item?.contactEmail}
                            </p>
                        </div>
                    </div>
                    <div
                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                                Contact Phone No.
                            </p>
                            <p className="text-sm font-medium leading-none">
                                {item?.contactPhoneNo}
                            </p>
                        </div>
                    </div>
                </CardContent>

            </Card>

        </div>
    )
}

export default ViewPropertyDetails