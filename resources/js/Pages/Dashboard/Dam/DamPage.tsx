import React, { useState } from "react";
import Layout from "../Layout";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { AddUser } from "./Components/add-user";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Loader2 } from "lucide-react"; // Assuming you're using Lucide icons.

type DamType = {
    id: number;
    name: string;
    mac_address: string;
};

const DamPage = ({ dams }: { dams: DamType[] }) => {
    const [loading, setLoading] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedDam, setSelectedDam] = useState<DamType | null>(null);

    const handleDelete = () => {
        // if (selectedUser) {
        //     setLoading(selectedUser.id);
        //     router.delete(
        //         route("master-user.destroy", { user: selectedUser.id }),
        //         {
        //             onFinish: () => {
        //                 setLoading(null);
        //                 setIsDialogOpen(false);
        //             },
        //         }
        //     );
        // }
    };

    const openDeleteDialog = (user: DamType) => {
        // setSelectedUser(user);
        // setIsDialogOpen(true);
    };

    return (
        <div className="m-4 space-y-4">
            <Card className="mt-5 bg-muted/50">
                <CardHeader>
                    <CardTitle>Bendungan</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Mac Address</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dams.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center"
                                    >
                                        No Data
                                    </TableCell>
                                </TableRow>
                            ) : (
                                dams.map((dam, index) => (
                                    <TableRow key={dam.id}>
                                        <TableCell>{dam.name}</TableCell>
                                        <TableCell>{dam.mac_address}</TableCell>
                                        <TableCell className="space-x-2">
                                            <Button className="bg-yellow-600 hover:bg-yellow-700">
                                                Edit
                                            </Button>
                                            <Button
                                                // onClick={() =>
                                                //     openDeleteDialog(user)
                                                // }
                                                className="bg-red-600 hover:bg-red-700"
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{" "}
                            <strong>{selectedUser?.name}</strong>? This action
                            cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            onClick={() => setIsDialogOpen(false)}
                            className="bg-gray-500 hover:bg-gray-600"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                            disabled={loading === selectedUser?.id}
                        >
                            {loading === selectedUser?.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Delete"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog> */}
        </div>
    );
};

DamPage.layout = (page: React.ReactNode) => <Layout children={page} />;

export default DamPage;
