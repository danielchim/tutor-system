import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {useState} from "react";

const DeleteWarn = ({onClickUrl}) => {

  const [isDeleting, setIsDeleting] = useState(false);

  const onClickAction = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(onClickUrl, { method: "POST" });
      if (response.ok) {
        alert("Account deleted successfully.");
      } else {
        alert("Failed to delete account.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (

    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onClickAction}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>

  )
}

export default DeleteWarn;
