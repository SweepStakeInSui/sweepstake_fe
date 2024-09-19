import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  avatar: z.string(),
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});
const EditProfile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: 'https://github.com/shadcn.png',
      username: 'Unnamed',
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    toast.success(values.username);
  }
  const isLoading = false;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="terriary" className="gap-x-1">
          <Svg src="/icons/edit.svg" />
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-bg-surface">
        <DialogHeader className="py-4 px-6">
          <DialogTitle>
            <Typography.Heading className="text-text">
              Edit Profile
            </Typography.Heading>
          </DialogTitle>
          <DialogDescription>
            <Typography.Text className="text-text-subtle">
              You can edit your nickname and profile&apos;s photo
            </Typography.Text>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="px-6 py-4">
              <div>
                {isLoading ? (
                  <Flex className="size-32 bg-blk-a85/60 justify-center rounded-full mx-auto">
                    <ReloadIcon className="text-white animate-spin" />
                  </Flex>
                ) : (
                  <div className="relative w-fit h-fit mx-auto">
                    <Avatar
                      isRounded
                      size="size2xl"
                      onClick={() => {
                        fileInputRef.current?.click();
                      }}
                      className="cursor-pointer mb-4 "
                    >
                      <AvatarImage src={form.getValues('avatar')} />
                      <AvatarFallback className="rounded-sm" />
                    </Avatar>
                    <Flex className="absolute bg-blk-a85/80 gap-x-0.5 rounded-full px-2 h-[26px] -bottom-1.5 left-1/2 -translate-x-1/2">
                      <Typography.Text
                        className="text-text-inverse"
                        size={15}
                        weight="regular"
                      >
                        Upload
                      </Typography.Text>
                      <Svg src="/icons/photo_camera.svg" />
                    </Flex>
                  </div>
                )}
              </div>
              <FormField
                control={form.control}
                name="avatar"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <input
                        id="avatar"
                        type="file"
                        ref={fileInputRef}
                        accept="image/png,image/jpeg,image/gif"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              if (typeof reader.result === 'string') {
                                form.setValue('avatar', reader.result, {
                                  shouldValidate: true,
                                });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Nickname</FormLabel>
                    <FormControl>
                      <Input placeholder="@username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="sm:justify-end bg-dyb-0 px-6 py-4 border-t-[1px] rounded-b-lg">
              <DialogClose asChild>
                <Button type="button" variant="terriary" size="lg">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
