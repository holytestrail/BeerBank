
## UI prototype

Grey shapes = buttons
Pink shapes = displayed values
In square brackets = input forms (when combined pink = the value is displayed but can be changed by typing in after tapping on it).
In curved brackets = values


## App screens

| Screen          | Element                                                                     | Type          | Action                    | Label             |
| --------------- | --------------------------------------------------------------------------- | ------------- | ------------------------- | ----------------- |
| **All screens** | Profile icon                                                                | Button        | Opens Profile screen      |                   |
|                 | Settings icon                                                               | Button        | Opens Settings screen     |                   |
|                 | Main screen button (on all screens except main)                             | Button        | Returns to main screen    | Back to main      |
|                 |                                                                             |               |                           |                   |
| **Main**        | MoneyBalance                                                                | Display       |                           |                   |
|                 | Spend money                                                                 | Button        | Opens SpendMoney screen   | Beer time!        |
|                 | ExTotal                                                                     | Display       |                           |                   |
|                 | Number of exercises to add                                                  | Display       |                           |                   |
|                 | Set number of ex's to add                                                   | Buttons       | Adjust the number to add  |                   |
|                 | Add                                                                         | Button        | Add the number to ExTotal | Add               |
|                 | Recently added sessions                                                     | Display       |                           |                   |
|                 |                                                                             |               |                           |                   |
| SpendMoney      | MoneyBalance                                                                | Display       |                           |                   |
|                 | Input to spend                                                              | Input form    |                           |                   |
|                 | Spend                                                                       | Button        | Writes off money          | Let's do it!      |
|                 | Recently spent money<br>(up to five most recent spendings; date and amount) | Display       |                           |                   |
|                 |                                                                             |               |                           |                   |
|                 |                                                                             |               |                           |                   |
| **Settings**    | Conversion rate input field                                                 | Display+Input |                           |                   |
|                 | Apply rate                                                                  | Button        |                           | Apply new rate    |
|                 | MoneyBalance                                                                | Display       |                           |                   |
|                 | Apply balance                                                               | Button        |                           | Apply new balance |
|                 |                                                                             |               |                           |                   |
| **Profile**     | Logged username (shows authenticated user account)                          | Display       |                           |                   |
|                 | Log out                                                                     | Buttons       | Logs user out             | Log out           |
|                 |                                                                             |               |                           |                   |

![[UI proto V2.png]]


(Not implemented yet: Balance renamed to credit)
![[UI proto V3.png]]