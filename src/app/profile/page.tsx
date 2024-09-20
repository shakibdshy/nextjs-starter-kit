import { Avatar, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

import { auth } from "@/config/auth";

export default async function Profile() {
  const session = await auth();

  if (!session?.user) return null;
  return (
    <div className="flex h-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="max-w-[400px] shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <Avatar
            src={session.user.image || undefined}
            alt="User Avatar"
            size="lg"
            isBordered
            color="primary"
          />
          <h3 className="mt-4 text-lg font-semibold">{session.user.name}</h3>
        </CardHeader>
        <Divider />
        <CardBody className="p-6">
          <h5 className="text-md mb-2 font-medium">Email:</h5>
          <p>{session.user.email}</p>
          <Divider className="my-4" />
          <h5 className="text-md mb-2 font-medium">Welcome Message:</h5>
          <p>
            Welcome to your profile! Here you can manage your personal
            information and settings.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
