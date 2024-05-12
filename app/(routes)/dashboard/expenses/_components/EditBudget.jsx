import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash, PenBox } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbconfig";
import { Budgets } from "@/utils/schema";
import { toast } from "sonner";
import { eq } from "drizzle-orm";

function EditBudget({ budgetInfo, reFreshData }) {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState(budgetInfo?.name);
  const [amount, setAmount] = useState(budgetInfo?.amount);

  const { user } = useUser();

  useEffect(() => {
    setEmojiIcon(budgetInfo?.icon);
    setName(budgetInfo?.name);
    setAmount(budgetInfo?.amount);
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    const result = await db
      .update(Budgets)
      .set({
        name: name,
        amount: amount,
        icon: emojiIcon,
      })
      .where(eq(Budgets.id, budgetInfo.id))
      .returning();

    if (result) {
      reFreshData();
      toast("Budget Updated!");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-purple-900 flex gap-2">
            {" "}
            <PenBox /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div>
                <Button
                  classname="text-lg"
                  variant="outline"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {" "}
                  {emojiIcon}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1"> Budget Name </h2>
                  <Input
                    placeholder="e.g. Home Decorr"
                    onChange={(e) => setName(e.target.value)}
                    defaultValue={budgetInfo?.name}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">
                    {" "}
                    Budget Amount{" "}
                  </h2>
                  <Input
                    type="number"
                    placeholder="e.g. 1,00,000"
                    onChange={(e) => setAmount(e.target.value)}
                    defaultValue={budgetInfo?.amount}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                className="mt-5 w-full bg-purple-900"
                disabled={!(name && amount)}
                onClick={() => onUpdateBudget()}
              >
                {" "}
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
