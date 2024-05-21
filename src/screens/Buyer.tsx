import Spinner from "@/app-components/Spinner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import privateClient from "@/config/api"
import { Label } from "@radix-ui/react-label"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Buyer() {

    const [loading, setLoading] = useState(true)
    const [properties, setProperties] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

  const [sortBy, setSortBy] = useState('propertyTitle');
  const [order, setOrder] = useState('asc');

    useEffect(() => {
        async function getProperties() {
            try {
                setLoading(true)
                const { data } = await privateClient.get(`/property/get-all?page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}`)
                setProperties(data)
                setTotalPages(data.properties.totalPages);

            } catch (e) {

            } finally {
                setLoading(false)
            }

        }

        getProperties()
    }, [currentPage, sortBy, order]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const navigate = useNavigate()

    function handleViewDetails(item) {
        navigate("/view-details",{state:item})
    }


    return (
        <div className="flex flex-col gap-y-6">

            <Label className="text-4xl font-bold">
                Properties
            </Label>
            <div className="flex flex-row gap-x-4">
                
                <div>
                    <label htmlFor="sortBy">Sort by:</label>
                    <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="propertyTitle">Title</option>
                        <option value="price">Price</option>
                        <option value="area">Area</option>
                    </select>
                    <label htmlFor="order">Order:</label>
                    <select id="order" value={order} onChange={(e) => setOrder(e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
            {
                loading && <Spinner />
            }
            <div className="flex flex-wrap gap-x-4 gap-y-6">

                {
                    properties?.properties?.map((item: any) => (
                        <Card className="w-[380px]">
                            <CardHeader>
                                <CardTitle>{item?.propertyTitle}</CardTitle>
                                <CardDescription className="truncate">{item?.description}</CardDescription>
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

export default Buyer