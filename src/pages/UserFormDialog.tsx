// components/UserFormDialog.tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateUser, useUpdateUser } from "@/hooks/useUserHook";
import { useState } from "react";
import type { User } from "@/types/UserType";

type Props = {
  mode: "create" | "edit";
  triggerLabel?: string;
  user?: User;
};

export const UserFormDialog = ({ mode, triggerLabel = "Open", user }: Props) => {
  const { mutate: createUser } = useCreateUser();
  const { mutate: updateUser } = useUpdateUser();

  const [form, setForm] = useState({
    firstname: user?.name.firstname || "",
    lastname: user?.name.lastname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    city: user?.address.city || "",
  });

  const handleSubmit = () => {
    const payload: User = {
      id: user?.id || Date.now(),
      email: form.email,
      username: form.email.split("@")[0],
      password: user?.password || "default123",
      name: { firstname: form.firstname, lastname: form.lastname },
      address: {
        city: form.city,
        street: user?.address.street || "",
        number: user?.address.number || 0,
        zipcode: user?.address.zipcode || "",
        geolocation: user?.address.geolocation || { lat: "", long: "" },
      },
      phone: form.phone,
      __v: user?.__v || 0,
    };

    mode === "edit" ? updateUser({ id: payload.id, user: payload }) : createUser(payload);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={mode === "edit" ? "outline" : "default"} size="sm">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Edit User" : "Create User"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Input
            placeholder="First Name"
            value={form.firstname}
            onChange={(e) => setForm({ ...form, firstname: e.target.value })}
          />
          <Input
            placeholder="Last Name"
            value={form.lastname}
            onChange={(e) => setForm({ ...form, lastname: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>
            {mode === "edit" ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
