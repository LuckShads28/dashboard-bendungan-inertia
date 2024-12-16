import { Switch } from "@/components/ui/switch";
import Layout from "../Layout";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
} from "recharts";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import InfoCardWidget from "../Components/info-card-widget";
import { z } from "zod";
import { route } from "ziggy-js";
import { toast } from "sonner";

const formSchema = z.object({
    mac_address: z.string().max(12),
});

type DamType = {
    id: number;
    name: string;
    mac_address: string;
    status: string;
    door_status: string;
    water_height: number;
    water_level: number;
    threshold: number;
};

// type DamHistoryType = {
//     water_height: number;
//     water_level: number;
//     created_at: string;
// };

type DamHistoryType = {
    water_height: number;
    water_level: number;
    door_status: string;
    threshold: number;
    created_at: string;
};

const chartConfig = {
    desktop: {
        label: "Test",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

const DamDetails = ({
    dam,
    dam_history,
}: {
    dam: DamType;
    dam_history: DamHistoryType[];
}) => {
    const { errors } = usePage().props;
    const [damData, setDamData] = useState(dam);
    const [damHistoryData, setDamHistoryData] = useState(dam_history);

    useEffect(() => {
        // Listen ke nama channel
        window.Echo.channel("dam-update").listen(
            ".dam-log", // dapat dari broadcastAs di event, harus ada .chat
            (event: DamHistoryType) => {
                setDamHistoryData((prevData) => {
                    if (prevData.length === 5) {
                        const shiftedData = prevData.slice(1);
                        shiftedData.push(event);
                        return shiftedData;
                    }
                    return [...prevData, event];
                });
                setDamData((prevData) => ({
                    ...prevData,
                    water_level: event.water_level,
                    water_height: event.water_height,
                }));
            }
        );

        return () => {
            window.Echo.leave("dam-update");
        };
    }, []);

    useEffect(() => {
        setDamData(dam);
        if (errors && Object.keys(errors).length > 0) {
            toast("Something wen't wrong", {
                description: "Can't update dam door",
            });
        }
    }, [dam]);

    const controlDoor = () => {
        // Update state
        router.put(route("door.control"), {
            mac_address: dam.mac_address,
            door_state: damData.door_status === "open" ? "close" : "open",
        });

        setDamData((prevData) => ({
            ...prevData,
            door_status: prevData.door_status === "open" ? "close" : "open",
        }));
    };

    return (
        <div className="m-4">
            <div className="flex justify-between">
                <div>
                    <h1 className="text-4xl">{dam.name}</h1>
                    <h5>Mac Address ({dam.mac_address})</h5>
                </div>
                <div className="flex items-center space-x-2">
                    <Label htmlFor="doorControl">Pintu Bendungan</Label>
                    <Switch
                        id="doorControl"
                        checked={damData.door_status === "open" ? true : false}
                        onCheckedChange={controlDoor}
                    />
                </div>
            </div>
            <div className="grid gap-4 my-6 auto-rows-min md:grid-cols-3">
                <Card className="w-full bg-muted/50">
                    <CardHeader className="text-center">
                        <CardTitle>Water Height</CardTitle>
                        <CardDescription>Centimeters (cm)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="m-6">
                            <LineChart
                                accessibilityLayer
                                data={damHistoryData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="created_at"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={15}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Line
                                    dataKey="water_height"
                                    type="basis"
                                    stroke="var(--color-desktop)"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="bg-muted/50">
                    <CardHeader className="text-center">
                        <CardTitle>Water Level</CardTitle>
                        <CardDescription>Percentage (%)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={chartConfig}
                            className="m-6 h-3/6"
                        >
                            <LineChart
                                accessibilityLayer
                                data={damHistoryData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />

                                <XAxis
                                    dataKey="created_at"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    // tickFormatter={(value) => value.slice(0, 3)}
                                    tickFormatter={(value, index) => {
                                        // Display only the first three ticks
                                        const maxTicks = 5;
                                        if (index >= maxTicks) return "";
                                        return value.slice(0, 5);
                                    }}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Line
                                    dataKey="water_level"
                                    type="natural"
                                    stroke="var(--color-desktop)"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="bg-muted/50">
                    <CardHeader className="text-center">
                        <CardTitle>Weather Info</CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent></CardContent>
                </Card>
            </div>
            <div className="grid gap-4 my-6 auto-rows-min md:grid-cols-4">
                <InfoCardWidget
                    title="Ketinggian Air"
                    data={damData.water_height}
                />
                <InfoCardWidget
                    title="Water Level"
                    data={`${damData.water_level}%`}
                />
                <InfoCardWidget
                    title="Threshold"
                    data={`${damData.threshold}%`}
                />
                <InfoCardWidget
                    title="Door Status"
                    data={
                        damData.door_status.charAt(0).toUpperCase() +
                        damData.door_status.slice(1).toLowerCase()
                    }
                />
            </div>
            <h1 className="my-5 text-2xl font-bold">History Data (Today)</h1>
            <Table className="bg-muted/50">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">No</TableHead>
                        <TableHead>Water Height</TableHead>
                        <TableHead>Water Level</TableHead>
                        <TableHead>Threshold</TableHead>
                        <TableHead>Door Status</TableHead>
                        <TableHead>Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {damHistoryData.length > 0 ? (
                        damHistoryData.map((item, index) => {
                            return (
                                <TableRow key={index + 1}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.water_height}</TableCell>
                                    <TableCell>{item.water_level}</TableCell>
                                    <TableCell>{item.threshold}</TableCell>
                                    <TableCell>
                                        {item.door_status
                                            .charAt(0)
                                            .toUpperCase() +
                                            item.door_status
                                                .slice(1)
                                                .toLowerCase()}
                                    </TableCell>
                                    <TableCell>{item.created_at}</TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                No History Data.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

DamDetails.layout = (page: React.ReactNode) => <Layout children={page} />;

export default DamDetails;
