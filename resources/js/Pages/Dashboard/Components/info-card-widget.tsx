import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function InfoCardWidget({
    title,
    data,
}: {
    title: string;
    data: number;
}) {
    return (
        <Card className="rounded-xl bg-muted/50">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold">{data}</div>
            </CardContent>
        </Card>
    );
}
