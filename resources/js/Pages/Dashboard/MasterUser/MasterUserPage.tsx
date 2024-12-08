import React, { useState } from "react";
import Layout from "../Layout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddUser } from "./Components/add-user";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Loader2 } from "lucide-react"; // Assuming you're using Lucide icons.

type UserType = {
    id: number;
    name: string;
    email: string;
};

const MasterUser = ({ users }: { users: UserType[] }) => {
    const [loading, setLoading] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

    const handleDelete = () => {
        if (selectedUser) {
            setLoading(selectedUser.id);
            router.delete(
                route("master-user.destroy", { user: selectedUser.id }),
                {
                    onFinish: () => {
                        setLoading(null);
                        setIsDialogOpen(false);
                    },
                }
            );
        }
    };

    const openDeleteDialog = (user: UserType) => {
        setSelectedUser(user);
        setIsDialogOpen(true);
    };

    return (
        <div className="m-4 space-y-4">
            <div className="flex justify-end">
                <AddUser />
            </div>
            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle>Master User</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center"
                                    >
                                        No Data
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((user, index) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell className="space-x-2">
                                            <Button className="bg-yellow-600 hover:bg-yellow-700">
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    openDeleteDialog(user)
                                                }
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

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            </Dialog>
        </div>
    );
};

MasterUser.layout = (page: React.ReactNode) => <Layout children={page} />;

export default MasterUser;
