# Requirements

I used Job stories, not User stories, because the app has only one user role, and the context of actions is more important than the user type.

## Epics and Job stories

| **Epic** | **Job Story ID** | **Description** | **Stage** |
| --- | --- | --- | --- |
| Balance | JSB1 | When I open BB app, 
I want to **see the total number of exercises**
So I can see how my little efforts have turned into cumulative impact with time. | MVP |
|  | JSB2 | When I've finished an exercise session,
I want to **add the number of exercises to the balance**
So that the Money balance increases accordingly. | MVP |
|  | JSB3 | When I've entered wrong exercise number,
I want to **decrease the total**
So that it stays correct. | MVP |
|  | JSB4 | When I open BB app,
I want to **see my Money balance**
So that I know if I can afford a beer. | MVP |
|  | JSB5 | When I've bought a beer,
I want to **write off the relevant number from my Money balance**
So that it stays correct. | MVP |
|  | JSB6 | When I've written off incorrect amount of money, **I want to correct the MoneyBalance manually** So that my Money balance is not lost in vain.  | MVP |
| Settings | JSS1 | When I evaluate my success and efforts,
I want to **convert exercise number to Money balance at a specific rate**
So that I can choose myself how challenging my excercise-to-beer path is. | MVP |
| Authentication | JSA1 | When I'm using the BBapp, **I want to be logged in**So that I have secure access to my personal data | MVP |
|  | JSA2 | When I'm asked to authenticate, **I want to sign in with my Google account**So I don't have to create a new user profile. | MVP |

| **Epic** | **Job Story ID** | **Description** | **Stage** |
| --- | --- | --- | --- |
| Balance | JSB1 | When I open BB app, 
I want to **see the total number of exercises**
So I can see how my little efforts have turned into cumulative impact with time. | MVP |
|  | JSB2 | When I've finished an exercise session,
I want to **add the number of exercises to the balance**
So that the Money balance increases accordingly. | MVP |
|  | JSB3 | When I've entered wrong exercise number,
I want to **decrease the total**
So that it stays correct. | MVP |
|  | JSB4 | When I open BB app,
I want to **see my Money balance**
So that I know if I can afford a beer. | MVP |
|  | JSB5 | When I've bought a beer,
I want to **write off the relevant number from my Money balance**
So that it stays correct. | MVP |
|  | JSB6 | When I've written off incorrect amount of money, **I want to correct the MoneyBalance manually** So that my Money balance is not lost in vain.  | MVP |
| Settings | JSS1 | When I evaluate my success and efforts,
I want to **convert exercise number to Money balance at a specific rate**
So that I can choose myself how challenging my excercise-to-beer path is. | MVP |
| Authentication | JSA1 | When I'm using the BBapp, **I want to be logged in**So that I have secure access to my personal data | MVP |
|  | JSA2 | When I'm asked to authenticate, **I want to sign in with my Google account**So I don't have to create a new user profile. | MVP |

## Requirements

| **Req ID
(Type-Story-No)** | **Description** | **AC** |
| --- | --- | --- |
| FR-JSA1-01 | The app shall keep the user logged in until the user logs out on purpose. | Given the user has logged in,
When the user re-opened the app,
Then they are logged in without having to authenticate again.
 |
| FR-JSA1-02 | The app shall allow users to authenticate using a Google account. | Given the user clicks "Login with Google", When the user successfully authenticated, Then the system logs the user in
AND displays the main app screen. |
| FR-JSB1-01 | The app shall display the total number of exercises (ExTotal) done by the user from over the whole their usage history.

UX: ExTotal shall be displayed on the Main screen.

 | Given the user has recorded excercises, When the main screen is open, Then ExTotal is displayed. 

Given the user has zero recorded exercises, When the main screen is open, Then ExTotal is displayed as “0”.

Given any added exercises are not synced, When the main screen is open, Then ExTotal is displayed according to the rule:
*ExTotal displayed = ExTotal from Server + Local unsynced number of exercises.*
 |
| FR-JSB4-01 | The app shall display current MoneyBalance.

UX: MoneyBalance shall be displayed on the Main screen. | Given the user has MoneyBalance other than 0, when the Main screen is open, MoneyBalance is displayed.

Given the user’s MoneyBalance=0, when the Main screen is open, MoneyBalance is displayed as “0”.

Given any added exercises are not synced, When the main screen is open, Then MoneyBalance is displayed according to the rule:
*MoneyBalance displayed = MoneyBalance from Server + (Local unsynced number of exercises)*(Local Conversion rate)* |
| FR-JSB2-01 | The app shall allow adding exercises, with the immediate changes to ExTotal and MoneyBalance (NFR-JSB2-01)

UX: The user shall be able to add the number of exercise by tapping buttons with numbers on them. | Given the ExTotal and MoneyBalance are displayed, When the user tapped one of “add number” buttons, Then: a) ExTotal is updated by adding this number to the current ExTotal displayed; b) MoneyBalance is updated by adding (number of added exercises)*(conversion rate); c) Random MSG-ADD message is displayed.

Alternative 1:
Given the ExTotal and MoneyBalance are displayed,, When the user tapped any “add number of exercises” buttons more than once within less than 500ms, only the first tap is processed. |
| NFR-01 | When the user has updated the exercise number OR MoneyBalance, Then ExTotal displayed and MoneyBalance displayed must be updated with a maximum delay of 500ms. |  |
| FR-JSB3-01 | The app shall allow decreasing ExTotal (and automatically decrease MoneyBalance accordingly).
(Delay: NFR-01)

UX: The user shall be able to decrease the ExTotal on a separate screen. | Given the “Decrease ExTotal” screen is open, When the user entered the number to decrease and tapped “OK”, Then: a) the user is redirected to Main screen; b) ExTotal is decreased accordingly; c) MoneyBalance is decreased by (number of exercised to decrease by)*(conversion rate); d) Message MSG-01 is displayed.

Alternative:
Given the user entered the number to decrease other than a natural number (1,2,3,etc.), the error message MSG-04 is displayed AND the app is waiting for correct input.

Alternative (not covered in MVP):
The user added N exercises by mistake and got N*rate money to their MoneyBalance; then changed conversion rate to rate_2. If they decrease the ExTotal now, their MoneyBalance decrease will not be accurate. We ignore this case for MVP.  |
| FR-JSS1-01 | The app shall allow setting a custom rate of converting the number of exercise to money.

UX: Done on a “Settings” screen. | Given the “Settings” screen is open, When the user entered the conversion rate AND tapped “OK”, Then: a) the user is redirected to Main screen; b) success message MSG-02 is displayed; c) all new conversions are performed according to the new rate.

Test case:
Given the user had changed conversion rate, When the user added some exercises on the Main screen, Then the MoneyBalance is updated according to the newly entered rate.

Alternative:
Given the “Settings” screen is open, When the user entered the rate other than a natural number (1,2,3,etc.), Then the error message MSG-04 is displayed AND the app is waiting for correct input. |
| FR-JSB5-01 | The app shall allow writing off MoneyBalance.
(Screen delay: NFR-01)

UX: MoneyBalance is written off by entering the write-off amount in a separate screen. | Given the MoneyBalance is >0 AND Write-off screen is open, When the user enters the amount to write off AND taps “OK”, Then: a) the user is redirected to Main screen; b) random MSG-SPEND message is displayed; c)  MoneyBalance displayed is decreased by the write-off amount.

Alternative 1
Given the Write-off screen is open, When the user entered the write-off amount other than a natural number (1,2,3,etc.), Then the error message MSG-04 is displayed AND the app is waiting for correct input.

Alternative 2:
Given the Write-off screen is open, When the user entered the write-off amount that exceeds MoneyBalance, Then the error message MSG-03 is displayed AND the app is waiting for correct input. |
| FR-JSB6-01 | The app shall allow for manual MoneyBalance correction.
(Screen delay: NFR-01)

UX: MoneyBalance correction is performed on a separate screen. | Given the MoneyBalance correction screen is open, When the user entered the amount of money to add AND tapped “OK”, Then: a) the user is redirected to Main screen; b) success message MSG-01 is displayed; c) MoneyBalance displayed is increased by the correction amount.

Alternative 1
Given the MoneyBalance correction screen is open, When the user entered the write-off amount other than a natural number (1,2,3,etc.), Then the error message MSG-04 is displayed AND the app is waiting for correct input. |

# UI Messages

| **Type** | **Context** | **ID** | **Text** |
| --- | --- | --- | --- |
| MSG-ADD | Exercise added | ADD-1 | Отлично! |
| MSG-ADD | Exercise added | ADD-2 | Так держать! |
| MSG-ADD | Exercise added | ADD-3 | Неплохо! |
| MSG-UI | Manual data update success | MSG-01 | Данные исправлены |
| MSG-UI | Manual data update success | MSG-02 | Обменный курс изменен |
| MSG-UI | Manual data update failure | MSG-03 | Недостаточно денег :(  |
| MSG-UI | Manual data update failure | MSG-04 | Введите целое число не меньше 1, без запятых и прочей ереси |
| MSG-SPEND | Money spent | SPEND-1 | Красиво позанимался — красиво отдохнул! |
| MSG-SPEND | Money spent | SPEND-2 | Приятного отдыха! |
| MSG-SPEND | Money spent | SPEND-3 | Молодец, честно заработал! |