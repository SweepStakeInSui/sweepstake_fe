import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { z } from 'zod';

import { CustomAvatar } from '@/components/common/CustomAvatar';
import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
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
import { fileService } from '@/services/fileService';
import { UserService } from '@/services/userService';
import { selectProfile, userData } from '@/store/profileSlice';

const formSchema = z.object({
  avatar: z.string().min(1, { message: 'Avatar is required.' }),
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});
const EditProfile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(selectProfile);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: profile?.avatar,
      username: profile?.username,
    },
  });

  const { mutate: updateFileMutation, isPending: isUpdateFileLoading } =
    useMutation({
      mutationFn: (file: File) => fileService.uploadFile(file),
      onSuccess: (data) => {
        if (data) {
          form.setValue('avatar', data, {
            shouldValidate: true,
          });
        }
      },
    });
  const { mutate: updateProfileMutation, isPending: isUpdateProfileLoading } =
    useMutation({
      mutationFn: ({
        username,
        avatar,
      }: {
        username: string;
        avatar: string;
      }) =>
        UserService.updateProfile({
          username,
          avatar,
        }),
      onSuccess: (data) => {
        dispatch(userData({ profile: data }));
        setOpen(false);
        form.reset();
        toast.success('Profile updated!');
      },
    });
  function onUpdateProfile(values: z.infer<typeof formSchema>) {
    updateProfileMutation({
      username: values.username,
      avatar: values.avatar,
    });
  }
  const { isValid } = form.formState;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="terriary" className="gap-x-1">
          <Svg src="/icons/edit.svg" />
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent
        hideCloseButton
        className="max-w-[388px] lg:max-w-md rounded-lg"
      >
        <DialogHeader>
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
          <form onSubmit={form.handleSubmit(onUpdateProfile)}>
            <div className="p-4 lg:px-6 lg:py-5">
              <div>
                {isUpdateFileLoading ? (
                  <Flex className="size-32 bg-blk-a85/60 justify-center rounded-full mx-auto">
                    <ReloadIcon className="text-white animate-spin" />
                  </Flex>
                ) : (
                  <div className="relative w-fit h-fit mx-auto mb-6">
                    <button
                      onClick={() => {
                        fileInputRef.current?.click();
                      }}
                    >
                      <CustomAvatar
                        src={form.getValues('avatar')}
                        size="size2xl"
                        className="cursor-pointer mb-4"
                      />
                    </button>

                    <Flex className="absolute bg-blk-a85/80 gap-x-0.5 rounded-full px-2 h-[26px] -bottom-1.5 left-1/2 -translate-x-1/2">
                      <Typography.Text
                        className="text-white"
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
                            updateFileMutation(file);
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
            <DialogFooter className="lg:mt-5">
              <DialogClose asChild>
                <Button type="button" variant="terriary" size="lg">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={!isValid || isUpdateProfileLoading}
              >
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
