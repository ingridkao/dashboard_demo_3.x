import { basicMapLayer, SentimentMapLayer, PatrolMapLayer, TrafficMapLayer, ConstructionMapLayer } from '@/assets/datas/topicList.js'
const ComponentList = [...basicMapLayer, ...SentimentMapLayer, ...PatrolMapLayer, ...TrafficMapLayer, ...ConstructionMapLayer ]

export const StrRules = new RegExp("^[a-zA-Z0-9]+$")
export const StrChRules = new RegExp("^[\u4e00-\u9fa5_a-zA-Z0-9_]+$")

/** Custom themes list
 *  
 */
export const CommonlyList = [
    {
        id: '1',
        name: '每日通勤必看',
        value: false
    },
    {
        id: '2',
        name: '買房關注焦點',
        value: false
    }
]

export const GetCommonlyList = () => {
    const retrievedArray = localStorage.getItem('CommonlyList')
    return retrievedArray? JSON.parse(retrievedArray): CommonlyList
}

export const SetCommonlyList = (array, payload, target) => {
    let CommonlyArray = array
    if(!payload && !StrChRules.test(payload)) return CommonlyArray
    if(target){
        CommonlyArray = CommonlyArray.map(item => {
            if(item.id === target){
                return {
                    ...item,
                    name: payload
                }
            }else{
                return item
            }
        })
    }else{
        const newID = CommonlyArray[CommonlyArray.length-1]['id']
        CommonlyArray.push({
            id: (parseInt(newID) + 1).toString(),
            name: payload,
            value: false
        })
    }
    localStorage.setItem('CommonlyList', JSON.stringify(CommonlyArray))
    return CommonlyArray
}

export const DeleteCommonlyList = (CommonlyArray, payload) => {
    if(!(payload && payload.id)) return CommonlyArray
    if(payload.id <= 2) return CommonlyArray
    const CommonlyNewArray = CommonlyArray.filter(item => item.id != payload.id  )
    localStorage.setItem('CommonlyList', JSON.stringify(CommonlyNewArray))
    return CommonlyNewArray
}



/** Custom component mapping list
 * <CommonlyList id>: [<component index>, <component index>...]
 */
const CustomComponent = {
    '1': ['hotnews'],
    '2': ['designate', 'building_renew']
}

export const GetCustomComponent = () => {
    // const retrievedObject = localStorage.getItem('CommonlyComponent')
    // return retrievedObject? JSON.parse(retrievedObject): CustomComponent
    return CustomComponent
}

export const SetCustomComponent = (array, obj, componentIndex) => {
    console.log(obj);
    // if(obj){
    //     const newObj = {}
    //     array.map(item => {
    //         const componentArray = CustomComponent[item.id]
    //         if(componentArray.includes(componentIndex)){
    //             componentArray = componentArray.filter(item2 => item2 != componentIndex)

    //             console.log(componentArray);
                
    //         }else{
    //             componentArray.push(componentIndex)
                
    //         }
    //     })
    //     localStorage.setItem('CommonlyComponent', JSON.stringify(newObj))
    //     return newObj
    // }
}

export const ParseCommonlyComponent = () => {
    const retrievedCommonlyList = GetCommonlyList()
    const retrievedCustomComponent = GetCustomComponent()
    return retrievedCommonlyList.map(item => {
        const componentArray = retrievedCustomComponent[item.id]? retrievedCustomComponent[item.id].map(componentID => {
            return ComponentList.find(component => component.index === componentID)
        }): []
        return {
            index: item.id,
            name: item.name,
            components: componentArray
        }
    })
}