'use client'
import {Button, Callout, Text, TextArea, TextField} from '@radix-ui/themes'
import dynamic from 'next/dynamic';
//import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver} from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });


/* interface IssueForm {
  title: string,
  description: string
} */

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
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
        {errors.title && <Text color='red' as='p' >{errors.title.message}</Text>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="The Issue is..." {...field}/>}
        >
        </Controller>
        {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
        
        <Button>Submit New Issue</Button>

      </form>
    </div>
  )
}

export default NewIssuePage