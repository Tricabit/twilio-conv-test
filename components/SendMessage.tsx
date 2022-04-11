import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { clientAPIs } from "../src/clintAPIs";
import styles from "../src/styles";
import conversation from "../src/twilio";

const SendMessage: React.FC = () => {
  const user =
    typeof localStorage !== "undefined"
      ? (JSON.parse(localStorage.getItem("user") ?? "null") as any | null)
      : null;

  //message form
  const {
    register: registerMessage,
    handleSubmit: messageHandleSubmit,
    reset: resetMessageForm,
    getValues: getMessageText,
  } = useForm({
    mode: "onChange",
  });

  //CALL API
  const { mutate: createConversation, isLoading: isLoadingConvCreation } =
    useMutation<any, any, { to: string; from: string }>(
      clientAPIs.createConversation,
      {
        onSuccess: async ({ room, twilioToken }) => {
          const { messageText } = getMessageText();
          console.log("messageText", messageText);
          try {
            await conversation.sendMessage(
              twilioToken?.token,
              room,
              messageText
            );
            toast.success("Done!");
            resetMessageForm();
          } catch (err) {
            throw new Error(err + "");
          }
        },
        onError: () => {
          toast.error("Oops... something went wrong :(");
        },
      }
    );

  return (
    <form
      onSubmit={messageHandleSubmit((data) => {
        createConversation({ to: data?.email, from: user.email });
      })}
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <textarea
        cols={50}
        rows={10}
        placeholder="Write a message..."
        {...registerMessage("messageText")}
      />
      <input
        {...registerMessage("email")}
        placeholder="Send to..."
        type="text"
        style={styles.input}
      />
      <button
        disabled={isLoadingConvCreation}
        type="submit"
        style={styles.button}
      >
        Send
      </button>
    </form>
  );
};

export default SendMessage;
