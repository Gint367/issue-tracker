'use client'
import {Button, Callout, TextArea, TextField} from '@radix-ui/themes'
import dynamic from 'next/dynamic';
//import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });


interface IssueForm {
  title: string,
  description: string
}

const NewIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit} = useForm<IssueForm>();
  //console.log(register('s'))
  const [error, setError] = useState('')

  
  return (
    <div className='max-w-xl space-y-3'>
      { error && <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
      <form className='space-y-3'  onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post('/api/issues', data);
          router.push('/issues');
        
        } catch (error) {
          setError('An unexpected error occured')
        }
        
        } )}>
        <TextField.Root  placeholder="Title"{...register('title')}>
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="The Issue is..." {...field}/>}
        >
        </Controller>
        
        <Button>Submit New Issue</Button>

      </form>
    </div>
  )
}

export default NewIssuePage