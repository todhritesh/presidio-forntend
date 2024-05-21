import Spinner from "@/app-components/Spinner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import privateClient from "@/config/api"
import { Label } from "@radix-ui/react-label"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function ViewMyPost() {

    const [loading, setLoading] = useState(true)
    const [properties, setProperties] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate()

    useEffect(() => {
        async function getProperties() {
            try {
                setLoading(true)
                const { data } = await privateClient.get(`/property/my-post?page=${currentPage}&limit=4`)
                setProperties(data)
                setTotalPages(data.properties.totalPages);

            } catch (e) {

            } finally {
                setLoading(false)
            }

        }

        getProperties()
    }, [currentPage])

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };


    function handleNavigate(item: any) {
        navigate("/edit-property", { state: item })
    }


    function handleViewDetails(item) {
        navigate("/view-details",{state:item})
    }
    return (
        <div className="flex flex-col gap-y-6">

            <Label className="text-4xl font-bold">
                My Posted Properties
            </Label>
            {
                loading && <Spinner />
            }
            <div className="flex flex-wrap gap-x-4 gap-y-6">

                {
                    properties?.properties?.map((item: any) => (
                        <Card className="w-[380px]">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>{item?.propertyTitle}</CardTitle>
                                    <Button onClick={() => handleNavigate(item)} className="">Edit</Button>
                                </div>
                                <CardDescription>{item?.description}</CardDescription>
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
                            </CardContent>
                            <CardFooter>
                            <Button onClick={()=>handleViewDetails(item)} className="w-full">
                                    View Full Details
                                </Button>
                            </CardFooter>
                        </Card>
                    ))

                }
            </div>

            <div className="flex self-center my-4 gap-x-4 items-center" >
                <Button variant={'outline'} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </Button>
                <span> Page {currentPage} of {totalPages} </span>
                <Button variant={'outline'} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </Button>
            </div>
        </div>
    )
}

export default ViewMyPost