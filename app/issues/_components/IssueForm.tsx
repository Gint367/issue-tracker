'use client'
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import dynamic from 'next/dynamic';
//import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import { patchIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessages from '@/app/components/ErrorMessages';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor'

/* interface IssueForm {
  title: string,
  description: string
} */

type IssueFormData = z.infer<typeof patchIssueSchema>;


const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(patchIssueSchema)
  });
  //console.log(register('s'))
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue)
        await axios.patch('/api/issues/' + issue.id, data);
      else
        await axios.post('/api/issues', data);
      router.push('/issues');
      router.refresh();

    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occured')
    }

  });

  return (
    <div className='max-w-xl space-y-3'>
      {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form className='space-y-3' onSubmit={onSubmit}>
        <TextField.Root defaultValue={issue?.title} placeholder="Title"{...register('title')}>
        </TextField.Root>
        <ErrorMessages>
          {errors.title?.message}
        </ErrorMessages>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => <SimpleMDE placeholder="The Issue is..." {...field} />}
        >
        </Controller>
        <ErrorMessages>
          {errors.description?.message}
        </ErrorMessages>

        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'}
          {' '}
          {isSubmitting && <Spinner></Spinner>} </Button>

      </form>
    </div>
  )
}

export default IssueForm