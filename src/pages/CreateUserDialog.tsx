// components/CreateUserDialog.tsx
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
import { useCreateUser } from "@/hooks/useUserHook";
import { useState } from "react";

export const CreateUserDialog = () => {
  const { mutate: createUser } = useCreateUser();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    city: "",

  });

  const handleSubmit = () => {
    createUser({
      // id: Date.now(),
      email: form.email,
      username: form.email.split('@')[0],
      password: 'default123',
      name: { firstname: form.firstname, lastname: form.lastname },
      address: {
        city: form.city,
        street: '',
        number: 0,
        zipcode: '',
        geolocation: { lat: '', long: '' },
      },
      phone: form.phone,
      __v: 0,
      
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
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
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            placeholder="Address"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
