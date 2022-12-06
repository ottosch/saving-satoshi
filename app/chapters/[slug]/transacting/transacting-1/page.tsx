'use client'

import { Input } from 'components/Input'
import { allLessons, Lesson } from 'contentlayer/generated'
import Link from 'next/link'
import { useState } from "react";
import clsx from 'clsx';
import RICIBs from 'react-individual-character-input-boxes';

const inputAmount = 40
const answer = '6a127461636f7320666f722065766572796f6e65'


//Am i going to to this boilerplate for every view? 
// TODO make a factory (or other pattnern) to populate component data

function getTx2() {
    const slug = 'transacting-1'
    const data = allLessons.find((challenge: Lesson) => challenge.slugAsParams === slug)
    return data
}


export default  function Genesispt2() {
    const genesis = getTx2()

    const [correctAnswer, setCorrectAnswer] = useState(false);

    function disableNext() {
        setCorrectAnswer(false);
    }
    
      function enableNext() {
        setCorrectAnswer(true);
    }


    // Todo use a more nextjs13 way of validating 
    const validateInput = (string) => {
        if (string == answer) {
            enableNext()
        }
        else {
            disableNext()
        }
    }

    return (
        <div className='flex flex-col items-center w-screen grow px-6 lg:px-0'>
            <div className='flex grow lg:w-1/2 w-screen text-white py-4'>
                <div className='flex flex-col justify-center px-6 lg:px-0 font-nunito'>
                    <div
                        className='genesis'
                        dangerouslySetInnerHTML={{ __html: genesis.body.html }}
                    ></div>
                    <div className='flex mt-8'>
                        <Link
                            href='https://blockstream.info/tx/75764fd0c95b4c17b728d10f7555509adfc0789ddc47683c45aeddd1c34727f8?expand'
                            target="_blank"
                            rel="noreferrer nofollow"
                            className='py-2.5 px-12 w-full md:w-auto justify-center bg-white text-base-blue text-xl font-nunito font-bold transition ease-in-out duration-150 hover:opacity-75'>
                            View transaction
                        </Link>
                    </div>
                </div>
            </div>
            <hr className='border-1 border-white/25 h-1 w-screen'></hr>
            <div className='flex grow lg:w-1/2 text-white font-space-mono justify-center'>
                <div className='flex flex-col justify-center'>
                    <h1 className='text-xl text-center'>Enter the OP_RETURN type</h1>
                    <div className='pt-8 w-full'>
                        <RICIBs
                            amount={inputAmount}
                            autoFocus
                            handleOutputString={validateInput}
                            inputProps={
                                {
                                    className: 'bg-transparent',
                                    placeholder: '_',
                                    style: {
                                        'font-size': '20px',
                                        'width': '20px',
                                        'height': '20px',
                                        'margin': '0px',
                                        'border-radius': '0px',
                                        'text-align': 'center',
                                        'justify-content': 'space-evenly',
                                        'outline': 'none',
                                        'font-family': 'var(--space-mono-font)'
                                    }
                                }}
                            inputRegExp={/^[a-zA-Z0-9_.-]*$/}
                        />
                    </div>
                </div>
            </div>
            <div className='w-screen border-t border-white/25'>
                <div className='flex items-center'>
                    <div className={clsx('flex items-center px-5 w-full align-middle transition ease-in-out duration-150', {
                        'bg-success/25': correctAnswer
                    })}>
                        <h2 className={clsx('text-white opacity-50 text-[21px] font-nunito transition ease-in-out duration-150', {
                            'opacity-100': correctAnswer
                        })}>{correctAnswer ? 'Challenge completed!' : 'Complete the challenge above to continue'}</h2>
                    </div>
                    <Link
                        href='/chapters/chapter-1/transacting/transacting-2'
                        className={clsx('py-4 px-12 w-full md:w-auto justify-center bg-white text-base-blue text-[21px] font-bold font-nunito transition ease-in-out duration-150', {
                            'pointer-events-none opacity-50': !correctAnswer,
                            'pointer-events-auto hover:opacity-75': correctAnswer
                        })}>
                        Next
                    </Link>
                </div>
            </div>
        </div>
    )
}