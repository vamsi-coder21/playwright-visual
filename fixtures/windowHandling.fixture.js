import { test as base } from '@playwright/test';

base.extend({
    openNewWindow:async({context},use)=>{
        await use(async(action)=>{
            await promiseHooks.all([
                context.waitForEvent('page'),
                action()
            ]);

            await newPage.waitForEvent();
            return newPage;
        })
    }
});
export default{test};  