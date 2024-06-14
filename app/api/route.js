import fsPromises from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server'

const dataFilePath = path.join(process.cwd(), 'db.env');

export async function GET(request) {
    var url = new URL(request.url)
    const assistantId = url.searchParams.get("assistantId")
    const jsonData = await fsPromises.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData);
    let resData
    if(assistantId!=null){
        let getAssistant
        if(assistantId=="new"){
            getAssistant = null
        }else{
            getAssistant = objectData.assistants[assistantId]
        }
        resData = {openAIKey:process.env.OPENAI_API_KEY,assistant:getAssistant}
    }else{
        resData = objectData
    }
    return NextResponse.json(resData)
  
}

