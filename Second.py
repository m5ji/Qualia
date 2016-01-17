
def Compare(str1, str2, order):
    #index of str1 and str2
    i = 0
    #index of order
    index = 0
    while(1):
        #Check if any of current index character is empty
        if(i >= len(str1) and i < len(str2)):
            return 1
        elif(i >= len(str2) and i < len(str1)):
            return 0
        #Check if both current index characters are the same
        elif(str1[i] == str2[i]):
            i = i + 1
        #Check if either of current index characters of the inputs matches with the current index character of 'order'
        elif(str1[i] == order[index]):
            return 1
        elif(str2[i] == order[index]):
            return 0
        else:
            index = (index + 1) % len(order)

def MySort(strings, order):
    for i in range(len(strings)):
        for j in range(i+1, len(strings)):
            #Swipe if j index string is closer to the string specifying the lexicographic order
            if(Compare(strings[i], strings[j], order) == 0):
                temp = strings[i]
                strings[i] = strings[j]
                strings[j] = temp
    print strings

MySort( ["acb", "abc", "bca"], "cba")

