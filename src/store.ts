export interface ChatGPTConversation {
    conversationId: string;
    parentMessageId: string
}

export interface Conversation {
    senderId : number,
    chatgpt?: ChatGPTConversation
}

const conversations: Conversation[] = []

export const findSessionBySenderId = (senderId: number): Conversation[] => {
    return conversations.filter(field => field.senderId === senderId)
}

export const saveSession = (senderId: number, data?: ChatGPTConversation): Conversation => {
    conversations.push({
        senderId,
        chatgpt: data
    })

    return findSessionBySenderId(senderId)[0]
}

export const updateSessionById = (senderId: number, data: ChatGPTConversation): boolean => {
    const index = findIndex(senderId)
    if (index > -1) {
        conversations[index] = {
            senderId,
            chatgpt: data
        }

        return true
    }

    return false
}

export const destroy = (senderId: number): boolean => {
    const index = findIndex(senderId)
    if (index > -1) {
        conversations.splice(index, 1)
        return true
    }

    return false
}

const findIndex = (senderId: number) :number => {

    const session = findSessionBySenderId(senderId)
    if (session.length) {
        return conversations.indexOf(session[0])
    }

    return -1;
}