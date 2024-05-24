"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LinkButton } from "@/components/ui/link-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { updateUserProfile } from "@/lib/actions/updateUserProfile";
import { insertUserSchema } from "@/lib/zod-schemas/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function EditProfilePage() {
  const { user } = useCurrentUser();

  const form = useForm<z.infer<typeof insertUserSchema>>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      ...(user
        ? user
        : {
            id: 0,
            username: "",
            firstname: "",
            lastname: "",
          }),
    },
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    form.setValue("firstname", user.firstname);
    form.setValue("lastname", user.lastname);
    form.setValue("username", user.username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof insertUserSchema>) {
    console.log("values:", values);
    console.log("user:", user);
    if (!user) {
      return;
    }

    const result = await updateUserProfile({
      ...values,
      ...user,
      firstname: (values.firstname?.trim() || user?.firstname) ?? "",
      username: (values.username?.trim() || user?.username) ?? "",
      lastname: (values.lastname?.trim() || user?.lastname) ?? "",
    });

    if ("error" in result) {
      toast.error("Failed to update profile.", {
        position: "top-center",
        description: `Something went wrong, please try again: ${result.error}`,
      });
    } else {
      toast.success("Profile updated!", {
        position: "top-center",
        duration: 10000,
        description: `Your profile has been updated!`,
      });
      router.push(`/account/profile`);
      form.reset();
    }
  }

  return (
    <div className="mb-16 mt-8 relative max-w-4xl mx-auto px-4 md:px-8">
      <h3 className="text-3xl font-semibold mx-auto mb-4 w-full text-center">
        Edit Profile
      </h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-w-5xl mx-auto w-full dark:text-warm-sand text-muted-foreground"
          // id="update-user-profile"
        >
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    {...field}
                    value={field.value as string | undefined}
                  />
                </FormControl>
                <FormDescription className="dark:text-warm-sand text-muted-foreground">
                  Your first name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Doe"
                    {...field}
                    value={field.value as string | undefined}
                  />
                </FormControl>
                <FormDescription className="dark:text-warm-sand text-muted-foreground">
                  Your last name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe"
                    {...field}
                    value={field.value as string | undefined}
                  />
                </FormControl>
                <FormDescription className="dark:text-warm-sand text-muted-foreground">
                  Your username is visible to other users
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2 w-full">
            <LinkButton href="/account/profile" variant="secondary">
              Cancel
            </LinkButton>
            <Button
              // form="update-user-profile"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
