import {SubmitFeedbackUseCase} from "./submit-feedback-use-case";
/*
test('sum 2 + 2',()=>{
    expect(2+2).toBe(4)
});
*/

const createFeedbackSpy=jest.fn();
const sendMailSpy=jest.fn();

const submitFeedback=new SubmitFeedbackUseCase(
    /*
    {create:async ()=>{}},
    {sendMail:async ()=>{}}
    */
   {create:createFeedbackSpy},
   {sendMail:sendMailSpy}
)

describe('Submit feeback',()=>{
    it('should be able to submit a feedback',async ()=>{

        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'example comment',
            screenshot:'data:image/png;base64,284y3823592359235u02'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit without type',async ()=>{
        await expect(submitFeedback.execute({
            type:'',
            comment:'example comment',
            screenshot:'data:image/png;base64,284y3823592359235u02'
        })).rejects.toThrow();
    });

    it('should not be able to submit without comment',async ()=>{
        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'',
            screenshot:'data:image/png;base64,284y3823592359235u02'
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback with an invalid screenshot',async ()=>{
        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'example comment',
            screenshot:'232'
        })).rejects.toThrow();
    })
});
